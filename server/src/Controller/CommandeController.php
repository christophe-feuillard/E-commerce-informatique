<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\OrderItem;
use App\Entity\OrderDetails;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'app_commande')]
class CommandeController extends AbstractController
{
    #[Route('/commande', name: 'app_commande')]
    public function index(Request $request,ManagerRegistry $doctrine, UserInterface $user): JsonResponse
    {
       
            $data = json_decode($request->getContent(), true);
            
             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a ete envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
            
            $order = new OrderDetails();
            $order->setNom('majid');
            $order->setPrenom('majid');
            $order->setEmail('majid');
            $order->setAdresseDeLivraison('majid');
            $order->setCodePostale('majid');
            $order->setVille('majid');
            $order->setNumeroDeSuivis('majid');
            $order->setUser($user);
            $order->setCreatedAt(new \DateTimeImmutable('now'));
            $entityManager->persist($order);
            $entityManager->flush($order);

            
            $product = $entityManager->getRepository(Article::class)->find(61);
            $item = new OrderItem();
            $item->setCommande($order);
            $item->setProduct($product);
            $item->setQuantity(1);
            $item->setCreatedAt(new \DateTimeImmutable('now'));
            $entityManager->persist($item);
            $entityManager->flush($item);

            $user = $entityManager->getRepository(OrderDetails::class)->find(2);
            dd($user);
            return $this->json('ok');
    }
}
