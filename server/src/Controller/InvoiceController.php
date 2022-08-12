<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use EasyApis\EasyInvoice;

class InvoiceController extends AbstractController{
    #[Route('/api/Invoice', name: 'app_api_Invoice')] 
    public function generateInvoice(Request $request) {
        $userData = $this->getUser();
        $panierData = json_decode($request->getContent(), true);

        foreach($panierData as $id => $item) {
            $titre = $item['titre'];
            $description = $item['description'];
            $price = $item['prix'];
        }
        
        $invoiceData = [
            "images" => [
                // The logo on top of your invoice
                "logo" => "https://public.easyinvoice.cloud/img/logo_en_original.png",
                // The invoice background
                "background" => "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            ],
            // Your own data
            "sender" => [
                "company" => "Ecommerce",
                "address" => "55 avenue de la Grande Armée",
                "city" => "New York",
                "zip" => "10001",
                "country" => "US"
            ],
            // Your recipient
                "client" => [
                    "company" => $userData->getName(),
                    "address" => $userData->getAdresse(),
                    "zip" => $userData->getCodePostal(),
                    "city" => $userData->getVille(),
                    "country" => "US"
                ],
            // "products" => [
            //     [
            //         "titre" => $titre,
            //         "description" => $description,
            //         "price" => $price
            //     ]
            // ],
            "bottom-notice" => "Kindly pay your invoice within 15 days.",   
        ];
$invoice = EasyInvoice::create($invoiceData);

return $this->json(base64_encode($invoice['pdf']));

}}
