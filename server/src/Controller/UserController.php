<?php

namespace App\Controller;


use App\Repository\ArticleRepository;
use App\Entity\Article;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


#[Route('/api', name: 'app_user')]
class UserController extends AbstractController
{
    
    #[Route('/user/buy', name: 'app_user_info', methods:('POST'))]
    public function userBuy(Request $request,ManagerRegistry $doctrine, ArticleRepository $articleRepository): JsonResponse
    {
        
        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a ete envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
            $product = $entityManager->getRepository(Article::class)->find(6);
            $stock = $product->getStock();

            if($stock >= $request->request->get('qty')){
                $product->setStock($stock - $request->request->get('qty'));
                $entityManager->flush();
                return $this->json('achat effectué');
            }else{
                return $this->json(`stock insuffisant il reste $stock en stock`);
            }
    
    }else{
        return $this->json('problem mon ami');
    }
    }

    #[Route('/user/role', name: 'app_user_info', methods:('GET'))]
    public function userRole(UserInterface $user)
    {
        return $this->json($this->getUser(), 200,[],['groups' => 'groupe:get']);

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('api/user/{id}', name: 'app_user')]
    public function User(EntityManagerInterface $em, $id)
    {
            return $this->json($em->getRepository(User::class)->find($id), 200,[],['groups' => 'groupe:get']);

    }
}
