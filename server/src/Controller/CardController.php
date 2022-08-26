<?php

namespace App\Controller;

use App\Entity\Card;
use App\Entity\User;
use App\Repository\CardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CardController extends AbstractController
{
    #[Route('/payment', name: 'app_card')]
    public function payment(Request $request, ManagerRegistry $doctrine, EntityManagerInterface $em, CardRepository $cardRepository)
    {
        $data = json_decode($request->getContent(), true);
            
        // $request->request->replace($data);

        // $entityManager = $doctrine->getManager();
        // $card = new Card();
        // $month = $request->request->get('month');
        // $year = $request->request->get('year');
        
        // $newMonth = $month.'/'. substr($year, -2);
        // $card->setNumber($request->request->get('number'));
        // $card->setName($request->request->get('name'));
        // $card->setCvc($request->request->get('cvc'));
        // $card->setDate($newMonth);

        // $entityManager->persist($card);
        // $entityManager->flush($card);

        // dd($data);
    // dd($data);
        return $this->json($this->getUser(), 200,[],['groups' => 'groupe:get']);
    }
}
