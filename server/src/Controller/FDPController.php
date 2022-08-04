<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

\EasyPost\EasyPost::setApiKey("EZTKe22861fa1589471986d05cf6d4cb7fd7bUySLyh5tew8xtl0C79PRw");

class FDPController extends AbstractController {
    #[Route('/api/FDP', name: 'app_api_FDP')] 
    public function dataFDP(Request $request) {
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
      
        var_dump($content);
    
            // $shipment = \EasyPost\Shipment::create([
            //     "from_address" => [
            //         "company" => "Ecommerce",
            //         "street1" => "55 avenue de la Grande Armée",
            //         "city" => "New York",
            //         "zip" => "10001",
            //         "phone" => "0651276143",
            //         "country" => "US",
            //         "state" => "New York"
            //     ],
            //     "to_address" => [
            //         "name" => $userData->getName(),
            //         "street1" => $userData->getAdresse(),
            //         "city " => $userData->getVille(),
            //         "zip" => $userData->getCodePostal(),
            //         "phone " => $userData->getPhone(),
            //         "state" => "New York"
            //     ],
            //     "parcel" => [
            //         "length" => $panierData['lenght'],
            //         "width"  => $panierData['width'],
            //         "height" => $panierData['height'],
            //         "weight" => $panierData['weight'],
            //         "predefined_package" => 'MediumExpressBox'
            //     ],
            // ]);
            // return $this->json($userData);
        return $this->json($userData, 200,[],['groups' => 'groupe:get']);
}}
