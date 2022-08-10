<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
// use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Avis;
use App\Entity\User;
use App\Entity\Article;

#[Route('/api')]
class AvisController extends AbstractController
{
    #[Route('/avis/save', name: 'app_avis')]
    public function save(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
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
        }else{
          return $this->json('problème mon ami');
        }

    $avis = new Avis();
    $article = new Article();
    $user = new User();
    $user->setEmail('jeanmichel@gmail.com');

    $avis->setMessage("fdssfd");
    $avis->setUser($user);
    $avis->setArticle($article);

    $entityManager = $doctrine->getManager();
    $entityManager->persist($avis); // prepare la requete
    $entityManager->persist($article); // prepare la requete
    $entityManager->persist($user); // prepare la requete
    $entityManager->flush(); // execute et sauvegarde la requete

    return new JsonResponse("C SAUVEGARDER POTO");
 
        return $this->json($request->request->get('message'));
    }
}
