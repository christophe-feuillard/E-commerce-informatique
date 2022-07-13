<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class ApiController extends AbstractController
{
    #[Route('/api', name: 'app_api')]
        public function getArticles(ArticleRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface)
        {
            return $this->json($articleRepository->findAll(), 200,[],['groups' => 'groupe:get']);
            
        }
    
    #[Route('/api/admin', name: 'admin')]
    public function getAdmin(UserRepository $userRepository) :Response
    {
        return $this->json($userRepository->findAll(), 200,[],['groups' => 'groupe:get']);
        
    }
}
