<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

// require_once("/path/to/vendor/easypost/autoload.php");

// \EasyPost\EasyPost::setApiKey(getenv('EASYPOST_API_KEY'));

class FDPController extends AbstractController {
    
    #[Route('/api/FDP', name: 'app_api_FDP')]
        public function dataFDP(SessionInterface $session, ArticleRepository $articleRepository) {
            $userData[] = $this->getUser();

            $panier = $session->get('panier', []);      // Recupere le panier de la sessiona actuel
            $panierData = [];

            foreach($panier as $id => $quantity) {
                $panierData[] = [
                    'article' => $articleRepository->find($id),
                    'quantity' => $quantity
                ];
                
                $width = 0;
                $lenght = 0;    // Parcel
                $height = 0;
                $weight = 0;

                foreach($panierData as $item) {
                    $totalWidth = $item['article']->getWidth();
                    $width+= $totalWidth;

                    $totalLenght = $item['article']->getLenght();
                    $lenght+= $totalLenght;

                    $totalHeight = $item['article']->getHeight();
                    $height+= $totalHeight;

                    $totalWeight = $item['article']->getWeight();
                    $weight+= $totalWeight;
                }
            }
        // var_dump($panierData, 'parcel');
        // var_dump($panier);
        // var_dump($userData, 'userData');

        // $shipment = \EasyPost\Shipment::create([
        //     "from_address" => [
        //         "company" => "Ecommerce",
        //         "street1" => "55 avenue de la Grande Armée",
        //         "city" => "Paris",
        //         "zip" => "75116",
        //         "phone" => "0155312897"
        //     ],
        //     "to_address" => [
        //             "name" => $userData['name'],
        //             "street1" => $userData['adresse'],
        //             "city " => $userData['ville'],
        //             "zip" => $userData['code_postal'],
        //             "phone " => $userData['phone']
        //     ],
        //     "parcel" => [
        //         "length" => $lenght,
        //         "width"  => $width,
        //         "height" => $height,
        //         "weight" => $weight
        //     ],
        // ]);

        $shipment = ([
            "from_address" => [
                "company" => "Ecommerce",
                "street1" => "55 avenue de la Grande Armée",
                "city" => "Paris",
                "zip" => "75116",
                "phone" => "0155312897"
            ],
            // "to_address" => [
            //         "name" => $userData['name'],
            //         "street1" => $userData['adresse'],
            //         "city " => $userData['ville'],
            //         "zip" => $userData['code_postal'],
            //         "phone " => $userData['phone']
            // ],
            "parcel" => [
                "length" => $lenght,
                "width"  => $width,
                "height" => $height,
                "weight" => $weight
            ],
        ]);
        var_dump($shipment);
        // return $this->json($userData, 200,[],['groups' => 'groupe:get']);
        return $this->json(['item' => $panierData, 'width' => $width, 'lenght' => $lenght, 'height' => $height, 'weight' => $weight], 200,[],['groups' => 'groupe:get']);
    // }
}
}