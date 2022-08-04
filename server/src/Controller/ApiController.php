<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Article;
use App\Entity\Categorie;
use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Doctrine\Persistence\ManagerRegistry;


class ApiController extends AbstractController
{
    #[Route('/api/articles', name: 'app_api')]
        public function getArticles(ArticleRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface)
        {
            return $this->json($articleRepository->findAll(), 200,[],['groups' => 'groupe:get']);
        }


        #[Route('/api/article/{id}', name: 'app_api_id')]
        public function getArticleById(Request $request, ArticleRepository $articleRepository, EntityManagerInterface $em, $id)
        {
        try{
        $new = $em->getRepository(Article::class)->find($id);
        $increments = $new->getVisit() + 1;
        $new->setVisit($increments);
        $em->persist($new);
        $em->flush();
        return $this->json($articleRepository->find($id), 200,[],['groups' => 'groupe:get']);            
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }

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
