<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\Mapping\Entity;
use App\Repository\UserRepository;
use App\Repository\VisitRepository;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class VisitController extends AbstractController
{
    #[Route('/visit', name: 'app_visit')]
    public function index(EntityManagerInterface $em)
    {
        $user = $em->getRepository(User::class)->find(1);

    }
}
