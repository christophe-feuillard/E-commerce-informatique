<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\CommentRepository;
use App\Entity\Comment;

#[Route('/api')]
class CommentController extends AbstractController
{
    #[Route('/comments', name: 'app_api_comment')]
    public function getComments(CommentRepository $commentRepository)
    {
        return $this->json($commentRepository->findAll());
    }

    #[Route('/avis/save', name: 'app_avis')]
    public function save(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        echo $request;
        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);


            if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a été envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();

            $comment = new Comment();  
            
            $comment->setMessage($request->request->get('message'));
            $comment->setUser($request->request->get('user')); // 45
            $comment->setArticle($request->request->get('article')); // 65
        
            $entityManager = $doctrine->getManager();
            $entityManager->persist($comment); // prepare la requete
            $entityManager->flush(); // execute et sauvegarde la requete
            return $this->json($request->request->get('message'));

        }else{
          return $this->json('problème mon ami');
        }

        // return $this->json([
        //     'message' => 'Welcome to your new controller!',
        //     'path' => 'src/Controller/CommentController.php',
        // ]);
    }
}
