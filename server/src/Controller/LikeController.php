<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Like;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LikeController extends AbstractController
{
    #[Route('/like/{id}', name: 'app_like')]
    public function Like($id, EntityManagerInterface $em)
    {
        $users = $this->json($this->getUser(), 200,[],['groups' => 'groupe:get']);
        $new = $em->getRepository(Article::class)->find($id);
        $new->getUsers();

        dd($new);

    }
}
