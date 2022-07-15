<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;


#[Route('/api', name: 'app_user')]
class UserController extends AbstractController
{

    #[Route('/user', name: 'app_user_info')]
    public function index(UserInterface $user): JsonResponse
    {
        
        return $this->json($user, 200,[],['groups' => 'groupe:get']);
    }
}
