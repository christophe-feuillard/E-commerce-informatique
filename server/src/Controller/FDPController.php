<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\ArticleRepository;

\EasyPost\EasyPost::setApiKey("EZTKe22861fa1589471986d05cf6d4cb7fd7bUySLyh5tew8xtl0C79PRw");

class FDPController extends AbstractController {
    #[Route('/api/FDP', name: 'app_api_FDP')] 
    public function dataFDP(Request $request, ArticleRepository $articleRepository) {
        $userData = $this->getUser();

        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);
            
             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('Erreur json');
            }
            if ($data === null) {
            return $this->json('Rien a ete envoyé');
            }
            $request->request->replace($data);

         }else{
            return $this->json('Probleme mon ami');
        }
        $content  = json_decode($request->getContent());

        $width = 0;
        $lenght = 0;    // Parcel
        $height = 0;
        $weight = 0;

        foreach($content as $item) {
            $totalWidth = $item->width;
            $width+= $totalWidth;

            $totalLenght = $item->lenght;
            $lenght+= $totalLenght;

            $totalHeight = $item->height;
            $height+= $totalHeight;

            $totalWeight = $item->weight;
            $weight+= $totalWeight;
        }
    
            $shipment = \EasyPost\Shipment::create([
                "from_address" => [
                    "company" => "Ecommerce",
                    "street1" => "55 avenue de la Grande Armée",
                    "city" => "New York",
                    "zip" => "10001",
                    "phone" => "0651276143",
                    "country" => "US",
                    "state" => "New York"
                ],
                "to_address" => [
                    "name" => $userData->getName(),
                    "street1" => $userData->getAdresse(),
                    "city " => $userData->getVille(),
                    "zip" => $userData->getCodePostal(),
                    "phone " => $userData->getPhone(),
                    "state" => "New York"
                ],
                "parcel" => [
                    "length" => $lenght,
                    "width"  => $width,
                    "height" => $height,
                    "weight" => $weight,
                    // "predefined_package" => 'MediumExpressBox'
                ],
            ]);
         
        return $this->json($shipment, 200,[],['groups' => 'groupe:get']);
}}
