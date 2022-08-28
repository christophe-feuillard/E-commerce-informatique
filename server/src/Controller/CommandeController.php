<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Article;
use App\Entity\OrderItem;
use App\Entity\OrderDetails;
use App\Repository\ArticleRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\OrderDetailsRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;



use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractObjectNormalizer;





#[Route('/api', name: 'app_commande')]
class CommandeController extends AbstractController
{
    #[Route('/commande', name: 'app_commande', methods:('POST'))]
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
            dd($request->request);
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

    #[Route('/getCommande', methods:('GET'))]
    public function getCommand(UserInterface $user)
    {
        return $this->json($user->getOrderDetails(), 200, [], ['groups' =>"groupe:get"]);
        
    }

    #[Route('/getSingleComm/{id}', methods:('GET'))]
    public function getSingleComm(UserInterface $user,OrderDetailsRepository $or, $id)
    {
        return $this->json($or->find($id), 200, [], ['groups' =>"groupe:get"]);
    }
}
