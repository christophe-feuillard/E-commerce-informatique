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
\EasyPost\EasyPost::setApiKey("EZTKe22861fa1589471986d05cf6d4cb7fd7bUySLyh5tew8xtl0C79PRw");

class FDPController extends AbstractController {
    
    #[Route('/api/user/FDP', name: 'app_api_FDP')]
        public function dataFDP(SessionInterface $session, ArticleRepository $articleRepository) {
            $userData = $this->getUser();

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

            $shipment = \EasyPost\Shipment::create([
                "from_address" => [
                    "company" => "Ecommerce",
                    "street1" => "55 avenue de la Grande Armée",
                    "city" => "Paris",
                    "zip" => "75116",
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

        // $shipment = ([
        //     "from_address" => [
        //         "company" => "Ecommerce",
        //         "street1" => "55 avenue de la Grande Armée",
        //         "city" => "Paris",
        //         "zip" => "75116",
        //         "phone" => "0155312897"
        //     ],
        //     "to_address" => [
        //             "name" => $userData->getName(),
        //             "street1" => $userData->getAdresse(),
        //             "city " => $userData->getVille(),
        //             "zip" => $userData->getCodePostal(),
        //             "phone " => $userData->getPhone()
        //     ],
        //     "parcel" => [
        //         "length" => $lenght,
        //         "width"  => $width,
        //         "height" => $height,
        //         "weight" => $weight
        //     ],
        // ]);
        // $shipment->buy($shipment->lowest_rate());
        // $shipment->buy($shipment->lowest_rate(array('USPS'), array('First')));

        return $this->json($shipment, 200,[],['groups' => 'groupe:get']);
}
}