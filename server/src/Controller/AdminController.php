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
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'app_admin')]
class AdminController extends AbstractController
{
    #[Route('/admin/show', name: 'app_admin_show')]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function show(ArticleRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface): JsonResponse
    {
        return $this->json($articleRepository->findAll(), 200,[],['groups' => 'groupe:get']);
    }

    #[Route('/admin/delete/{id}', name: 'app_admin_delete')]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function delete(ManagerRegistry $doctrine,UserRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface, $id): JsonResponse
    {
        $em = $doctrine->getManager();
        $product = $em->getRepository(Article::class)->find($id);


        if (!$product) {
            return $this->json('pas d\'article trouver '.$id);
        }
        
        $em->remove($product);
        $em->flush();
        //  $entityManager->remove($product);
        //  $entityManager->flush();
         return $this->json('c\'est carré');


    }

    #[Route('/admin/add', name: 'app_admin_add', methods:('POST'))]
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
            $user->setStock($request->request->get('stock'));
            $user->setCreatedAt(new \DateTimeImmutable('now'));
            $entityManager->persist($user);
            $entityManager->flush($user);

            return $this->json('parfait');

        }else{
            return $this->json('problème mon ami');
        }
    }

    #[Route('/admin/update/{id}', name: 'app_admin_update', methods:('POST'))]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function update(Request $request,ManagerRegistry $doctrine, $id, ArticleRepository $articleRepository): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Article::class)->find($id);
        
        
        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

             if($product === null){
                return $this->json('aucun article correspond à l\'id');
             }

             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a été envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
        
        
    }else{
        return $this->json('problème mon ami');
    }
        $product->setTitre($request->request->get('titre'));
        $product->setPrix($request->request->get('prix'));
        $product->setPhoto($request->request->get('photo'));
        $product->setDescription($request->request->get('description'));
        $product->setStock($request->request->get('stock'));
        $product->setCaracteristique($request->request->get('caracteristique'));
        $entityManager->flush();
        
        return $this->json('changement effectué');
    }

    #[Route('/admin/showStock', name: 'app_admin_show_stock')]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function showStock(ArticleRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface): JsonResponse
    {
        return $this->json($articleRepository->findBy(array(), array('stock' => 'ASC')), 200,[],['groups' => 'groupe:get']);
    }


    #[Route('/admin/setdiscount/{id}',  methods:('POST'))]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function setDiscount(Request $request,ManagerRegistry $doctrine, $id, ArticleRepository $articleRepository): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Article::class)->find($id);
        $initialPrice = $product->getPrix();
        
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

    try{
        $product->setStartDicount($request->request->get('start'));
        $product->setEndDiscount($request->request->get('end'));
        $product->setDiscount($request->request->get('persentDiscount'));
        $entityManager->flush();
        return $this->json('ok discount effectué');
    } catch (e) {
        return $this->json(e);
    }
      


    }


    #[Route('/admin/removeDicount/{id}')]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function removeDiscount(ManagerRegistry $doctrine, $id, ArticleRepository $articleRepository): JsonResponse
    {
        try{
            $entityManager = $doctrine->getManager();
            $product = $entityManager->getRepository(Article::class)->find($id);
            $oldPrice = $product->getOldPrice();
           
            if($oldPrice !== null){
                 $product->setPrix($oldPrice);
            }
            $product->setDiscount(null);
            $product->setOldPrice(null);
            $product->setStartDicount(null);
            $product->setEndDiscount(null);
            
            $entityManager->flush();

            return $this->json('ok discount enlever');
        } catch (e) {
            return $this->json(e);
        }
        

    }





}
