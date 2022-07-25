<?php

namespace App\Controller;

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
