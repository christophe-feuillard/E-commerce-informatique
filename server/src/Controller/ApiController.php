<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Article;
use App\Entity\Categorie;
use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;



class ApiController extends AbstractController
{
    #[Route('/api/articles', name: 'app_api')]
        public function getArticles(ArticleRepository $articleRepository, NormalizerInterface $normalize, SerializerInterface $serializerInterface)
        {
            return $this->json($articleRepository->findAll(), 200,[],['groups' => 'groupe:get']);
        }

    
        #[Route('/api/article/{id}', name: 'app_api_id')]
        public function getArticleById(Request $request, ArticleRepository $articleRepository, EntityManagerInterface $em, $id)
        {
        try{
        $new = $em->getRepository(Article::class)->find($id);
        $increments = $new->getVisit() + 1;
        $new->setVisit($increments);
        $em->persist($new);
        $em->flush();
        return $this->json($articleRepository->find($id), 200,[],['groups' => 'groupe:get']);            
        } catch (NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }

        }

        #[Route('/api/categories', name: 'app_api_categories')]
        public function getCategorie(CategorieRepository $categorieRepository)
        {
            return $this->json($categorieRepository->findAll(), 200,[],['groups' => 'groupe:get']);
        }

        #[Route('/api/categories/{id}', name: 'app_api_id_categories')]
        public function getCategorieById(CategorieRepository $categorieRepository, $id)
        {
            return $this->json($categorieRepository->find($id), 200,[],['groups' => 'groupe:get']);       
        }   
        
        #[Route('/api/panier', name: 'app_api_panier')]  // ALL PANIER / AFFICHAGE
        public function allPanier(Request $request,  SessionInterface $session, ArticleRepository $articleRepository) {
// dd($request);
            $panier = $session->get('panier', []);      // Recupere le panier de la sessiona actuel
            $panierData = [];
            
            foreach($panier as $id => $quantity) {
                $panierData[] = [
                    'article' => $articleRepository->find($id),
                    'quantity' => $quantity
                ];
 
                $total = 0;     // Init le total du panier
                
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
                    $totalItem = $item['article']->getPrix() * $item['quantity'];    // Multiplie le prix de l'article par sa quantity
                    $total += $totalItem;
                }
            }
            // dd($total);
            return $this->json(['item' => $panierData, 'total' => $total, 'width' => $width, 'lenght' => $lenght, 'height' => $height, 'weight' => $weight], 200,[],['groups' => 'groupe:get']);
            // dd($panierData);
        }

        #[Route('/api/panier/add/{id}', name: 'app_api_panier_add')]  // Route pour ajouter article dans le panier via Button Ajouter Panier
        public function addPanier(Request $request, $id, SessionInterface $session) {
            // dd($request);
            $panier = $session->get('panier', []);      // Recup le panier ou le creez 
            // dd($session);
            if(!empty($panier[$id])) {      // Si j'ai déja cet article dans mon panier
                $panier[$id]++;             // Alors incremente le 
            }else {
                $panier[$id] = 1;       // Ajoute l'article dans le panier et ajoute 1 au stock du panier
            }

            $session->set('panier', $panier);   // Update le panier / Save le panier
            dd($session);
            // dd($session->get('panier'));    
            return $this->json($panier, 200,[],['groups' => 'groupe:get']);
        }

        #[Route('/api/panier/remove/{id}', name: 'app_api_panier_remove')]  // Route pour supprimer un element du panier
        public function removePanier($id, SessionInterface $session) {
            $panier = $session->get('panier', []);

            if(!empty($panier[$id])) {
                unset($panier[$id]);
            }

            $session->set('panier', $panier);

            return $this->redirectToRoute("app_api_panier");
        }
}
