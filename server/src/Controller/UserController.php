<?php

namespace App\Controller;

use App\Entity\Card;
use App\Entity\User;
use App\Entity\Article;
use Doctrine\ORM\Mapping\Id;
use App\Repository\CardRepository;
use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

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
                return $this->json("stock insuffisant il reste $stock en stock");
            }
    }else{
        return $this->json('problem mon ami');
    }
    }


    #[Route('/user/role', name: 'app_user_info', methods:('GET'))]
    public function userRole()
    {
        return $this->json($this->getUser(), 200,[],['groups' => 'groupe:get']);
    }

    #[Route('/payment', name: 'app_card', methods:('POST'))]
    public function payment(Request $request, ManagerRegistry $doctrine)
    {
        $json = json_decode($request->getContent(), true);
        $request->request->replace($json);
      
        $entityManager = $doctrine->getManager();
        $card = new Card();
        $month = $request->request->get('month');
        $year = $request->request->get('year');
        $carNumber = $request->request->get('number');
        $newMonth = $month.'/'. substr($year, -2);
      
     
        $card->setName($request->request->get('name'));
        $card->setFirstname($request->request->get('firstname'));
        $card->setCvc($request->request->get('cvc'));
        $card->setDate($newMonth);
        $card->setUser($this->getUser());
        $card->setNumber($request->request->get('number'));
        
        $entityManager->persist($card);
        $entityManager->flush($card);


      return $this->json($json, 200,[],['groups' => 'groupe:get']);
    }

}