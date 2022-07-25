<?php

namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use App\Repository\CategorieRepository;
use Symfony\Component\Security\Http\Attribute\CurrentUser;


class ApiController extends AbstractController
{
    #[Route('/api/articles', name: 'app_api')]
        public function getArticles(ArticleRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface)
        {

            // $article = $articleRepository->findAll();                                                  //RECUPERATION DANS LA BDD

            // $articleRepository = $normalize->normalize($article, null, ['groups' => 'groupe:get']);    //CONVERTIT EN TABLEAU ASSOCIATIF
            // $json = json_encode($articleRepository);                                                   //L'ENCODE EN JSON

            //////////////////////////////////OU//////////////////////////

            // $json = $serializerInterface->serialize($articleRepository, 'json', ['groups' => 'groupe:get']);    // CONVERIT ET ENCODE 


            // $resonse = new Response($json, 200, [
            //     "Content-Type" => "application/json"
            // ]);

            // return $resonse;


            return $this->json($articleRepository->findAll(), 200,[],['groups' => 'groupe:get']);
        }


        #[Route('/api/article/{id}', name: 'app_api_id')]
        public function getArticleById(ArticleRepository $articleRepository, $id)
        {
            return $this->json($articleRepository->find($id), 200,[],['groups' => 'groupe:get']);
            
        }

        #[Route('/api/categories', name: 'app_api_categories')]
        public function getCategorie(CategorieRepository $categorieRepository)
        {
            return $this->json($categorieRepository->findAll(), 200,[],['groups' => 'groupe:get']);
        }


        #[Route('/api/categories/{id}', name: 'app_api_id_categories')]
        public function getCategorieById(CategorieRepository $categorieRepository, $id)
        {
            return $this->json($categorieRepository->find($id), 200,[],['groups' => 'groupe:get']);
            
        }



        
}
