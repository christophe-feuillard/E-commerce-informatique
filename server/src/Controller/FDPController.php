<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

\EasyPost\EasyPost::setApiKey("EZTK43459e0123eb4be6b9f321fa4acb658fUdW0DWgDyARhidHOEGll5w");
class FDPController extends AbstractController {
    #[Route('/api/FDP', name: 'app_api_FDP', methods:'POST')] 
    public function dataFDP(Request $request,  NormalizerInterface $normalize, SerializerInterface $serializer){
        
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        $panier = json_decode($data["panier"]);
        
        $width = 20.2;
        $lenght = 10.2;
        $height = 10.3;
        $weight = 2.2;
       
        $content =  $panier;

       foreach($content as $item) {

            $totalWidth = $item->width;
            $width += $totalWidth;

            $totalLenght = $item->lenght;
            $lenght+= $totalLenght;
            
            $totalHeight = $item->height;
            $height+= $totalHeight;
            
            $totalWeight = $item->weight;
            $weight+= $totalWeight;

        }

    //     var_dump($totalWidth, $totalWeight, $totalHeight, $totalLenght);
        
        try {
        $shipment = \EasyPost\Shipment::create([
            "from_address" => [
                "name" => "Tene",
                "company" => "Ecommerce",
                "street1" => "900 Bergen Ave",
                "city" => "New York",
                "zip" => "07306",
                "phone" => "0651276143",
                "country" => "US",
                "state" => "New York"
            ],
            "to_address" => [
                "name" => $request->request->get('name'),
                "street1" => $request->request->get('adresse'),
                "city" => "New York",
                "zip" => $request->request->get('zip'),
                "phone" => $request->request->get('numero'),
                "state" => "New York",
                "country" => "US",
            ],
            "parcel" => [
                "length" => 19,2,
                "width"  => 22,3,
                "height" => 23,1,
                "weight" => 39,3,
                // "predefined_package" => 'MediumExpressBox'
            ],

            "customs_info" => [
               
                "customs_items" => [
                  [
                  "description" => "T-shirt",
                  "quantity" => 1,
                  "weight" => 5,
                  "value" => 10,
                  "origin_country" => "US"]
                  ]
            ]
        ]);
        } catch (\EasyPost\Error $e) {

            return $this->json($e);
        }

     
        $shipment->buy($shipment->lowest_rate());
        $label = $shipment->postage_label->label_url;  // LABEL
        $track = $shipment->tracker->public_url;  // SUIVIS DE COMMANDE.
    return $this->json([$shipment,$label, $track], 200,[],['groups' => 'groupe:get']);
}};
