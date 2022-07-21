<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Like;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LikeController extends AbstractController
{
    #[Route('/like/{id}', name: 'app_like')]
    public function Like($id, EntityManagerInterface $em)
    {
        $new = $em->getRepository(Like::class)->find($id);
     

        dd($new);

    }
}
