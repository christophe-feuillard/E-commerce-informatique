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
    #[Route('/like', name: 'app_like')]
    public function Like()
    {
        // $new = $em->getRepository(User::class)->find($id);
        
        
        // dd($new);
        return $this->json($this->getUser(), 200,[],['groups' => 'groupe:get']);

    }
}
