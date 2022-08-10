<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Avis;
#[Route('/api')]
class AvisController extends AbstractController
{
    #[Route('/avis/save', name: 'app_avis')]
    public function save(): JsonResponse
    {
        $entityManager = $doctrine->getManager();

        $avis = new Avis();
        $avis->setMessage('test msg');
        $avis->setUser("jeanmichelzer");
        $avis->setArticle('Ergonomic and stylish!');

        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($avis);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        $avis = new Avis();
        $avis->setMessage($message);
        // $avis->setUser("jean mi");
        // $avis->setArticle(66);
        // $avis->setDate($date);
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/AvisController.php',
        ]);
    }
}
