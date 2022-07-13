<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use  Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'app_admin')]
class AdminController extends AbstractController
{
    #[Route('/admin/show', name: 'app_admin')]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function show(ArticleRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface): JsonResponse
    {
        return $this->json($articleRepository->findAll(), 200,[],['groups' => 'groupe:get']);
    }

    #[Route('/admin/delete/{id}', name: 'app_admin')]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function delete(ManagerRegistry $doctrine,UserRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface, $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Article::class)->find($id);


        if (!$product) {
            return $this->json('pas d\'article trouver '.$id);
        }

         $entityManager->remove($product);
         $entityManager->flush();
         return $this->json('c\'est carré');


    }

    #[Route('/admin/add', name: 'app_admin', methods:('POST'))]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function add(Request $request,ManagerRegistry $doctrine): JsonResponse
    {

        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }
        if ($data === null) {
            return true;
        }
        
            $request->request->replace($data);
            $entityManager = $doctrine->getManager();

            $user = new Article();
            $user->setTitre($request->request->get('titre'));
            $user->setPrix($request->request->get('prix'));
            $user->setPhoto($request->request->get('photo'));
            $user->setDescription($request->request->get('description'));
            $user->setCaracteristique($request->request->get('caracteristique'));
            $entityManager->persist($user);
            $entityManager->flush($user);

            return $this->json('parfait');

        }else{
            return $this->json('problem mon ami');
        }
    }

    #[Route('/admin/update/{id}', name: 'app_admin', methods:('POST'))]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function update(Request $request,ManagerRegistry $doctrine, $id, ArticleRepository $articleRepository): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Article::class)->find($id);
        
        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

             if($product === null){
                return $this->json('aucune article correspond a l\'id');
             }

             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a ete envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
        
        
    }else{
        return $this->json('problem mon ami');
    }
        $product->setTitre($request->request->get('titre'));
        $product->setPrix($request->request->get('prix'));
        $product->setPhoto($request->request->get('photo'));
        $product->setDescription($request->request->get('description'));
        $product->setCaracteristique($request->request->get('caracteristique'));
        $entityManager->flush();
        
        return $this->json('changement effectué');
    }




}
