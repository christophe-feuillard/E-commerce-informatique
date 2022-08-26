<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\OrderItem;
use App\Entity\OrderDetails;
use App\Repository\ArticleRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\OrderDetailsRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'app_commande')]
class CommandeController extends AbstractController
{
    #[Route('/commande', name: 'app_commande')]
    public function index(Request $request,ManagerRegistry $doctrine, UserInterface $user, OrderDetailsRepository $or, ArticleRepository $ar, SerializerInterface $serializer): JsonResponse
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
            $order->setNom($request->request->get('name'));
            $order->setPrenom($request->request->get('firstname'));
            $order->setEmail($request->request->get('firstname'));
            $order->setAdresseDeLivraison($request->request->get('adresse'));
            $order->setCodePostale($request->request->get('zip'));
            $order->setVille($request->request->get('city'));
            $order->setNumeroDeSuivis($request->request->get('suivis'));
            $order->setUser($user);
            $order->setCreatedAt(new \DateTimeImmutable('now'));
            $entityManager->persist($order);
            $entityManager->flush($order);

        $panier = json_decode($request->request->get('panier'), true);
        foreach($panier as $pan){
            $product = $entityManager->getRepository(Article::class)->find($pan['id']);
            $item = new OrderItem();
            $item->setCommande($order);
            $item->setProduct($product);
            $item->setQuantity($pan['quantity']);
            $item->setCreatedAt(new \DateTimeImmutable('now'));
            $entityManager->persist($item);
            $entityManager->flush($item);
      
        }

        return $this->json("c'est bon");
    }

    #[Route('/getCommande', name: 'app_commande')]
    public function getCommand(Request $request,ManagerRegistry $doctrine, UserInterface $user, OrderDetailsRepository $or, ArticleRepository $ar, SerializerInterface $serializer): JsonResponse
    {
        $commande = $or->findOneBy(['user' => $user]);
        $entityManager = $doctrine->getManager();
        // $userr = $entityManager->getRepository(User::class)->find();

       // dd($user->getOrderDetails());
        // return $this->json($jsonContent , 200,[],['groups' => 'groupe:get']);
        return $this->json($user->getOrderDetails() , 200,[],['groups' => 'groupe:get']);
    }
}
