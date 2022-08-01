<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

\EasyPost\EasyPost::setApiKey("EZAK43459e0123eb4be6b9f321fa4acb658f2IWUOgc56Vzsd0I3EVb2Gg");

class FDPController extends AbstractController {
    
    #[Route('/api/user/FDP', name: 'app_api_FDP')]
        public function dataFDP(SessionInterface $session, ArticleRepository $articleRepository) {
            $userData = $this->getUser();
            dd($userData);

            $panier = $session->get('panier', []);      //Récupère le panier de la session actuel
            $panierData = [];

            foreach($panier as $id => $quantity) {
                $panierData[] = [
                    'article' => $articleRepository->find($id),
                    'quantity' => $quantity
                ];
                
                $width = 10;
                $lenght = 20;
                $height = 10;
                $weight = 20;

                foreach($panierData as $item) {
                    $totalWidth = $item['article']->getWidth();
                    $width += $totalWidth;

                    $totalLenght = $item['article']->getLenght();
                    $lenght += $totalLenght;

                    $totalHeight = $item['article']->getHeight();
                    $height += $totalHeight;

                    $totalWeight = $item['article']->getWeight();
                    $weight += $totalWeight;
                }
            }

            $shipment = \EasyPost\Shipment::create([
                "from_address" => [
                    "company" => "Ecommerce",
                    "street1" => "55 avenue de la Grande Armée",
                    "city" => "New York",
                    // "city" => "Paris",
                    // "zip" => "75116",
                    "zip" => "10001",
                    "phone" => "0155312897"
                ],
                "to_address" => [
                    "name" => $userData->getName(),
                    "street1" => $userData->getAdresse(),
                    "city " => $userData->getVille(),
                    "zip" => $userData->getCodePostal(),
                    "phone " => $userData->getPhone()
                ],
                "parcel" => [
                    "length" => $lenght,
                    "width"  => $width,
                    "height" => $height,
                    "weight" => $weight
                ],
            ]);
        
            // $shipment = [
            //     "from_address" => [
            //         "company" => "Ecommerce",
            //         "street1" => "55 avenue de la Grande Armée",
            //         "city" => "New York",
            //         // "city" => "Paris",
            //         // "zip" => "75116",
            //         "zip" => "10001",
            //         "phone" => "0155312897"
            //     ],
            //     "to_address" => [
            //         "name" => $userData->getName(),
            //         "street1" => $userData->getAdresse(),
            //         "city " => $userData->getVille(),
            //         "zip" => $userData->getCodePostal(),
            //         "phone " => $userData->getPhone()
            //     ],
            //     "parcel" => [
            //         "length" => $lenght,
            //         "width"  => $width,
            //         "height" => $height,
            //         "weight" => $weight
            //     ],
            // ];
        // $shipment->buy($shipment->lowest_rate());
        // $shipment->buy($shipment->lowest_rate(array('USPS'), array('First')));

        return $this->json($shipment, 200,[],['groups' => 'groupe:get']);
}
}