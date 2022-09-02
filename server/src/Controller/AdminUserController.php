<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Article;
use App\Entity\Emballage;
use App\Repository\UserRepository;
use App\Repository\ArticleRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api')]
class AdminUserController extends AbstractController
{
    #[Route('/admin/user')]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function index(ManagerRegistry $doctrine, UserRepository $userRepo): JsonResponse
    { 
        return $this->json($userRepo->findAll(), 200,[],['groups' => 'groupe:get']);
    }

    #[Route('/admin/user/update/{id}', methods:('POST'))]
    #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
    public function Userupdate(ManagerRegistry $doctrine, Request $request, UserRepository $userRepo, $id): JsonResponse
    {

        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a ete envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
            
        
         }else{
            return $this->json('problem mon ami');
        }


          try{
             $user = $entityManager->getRepository(User::class)->find($id);
            $checkEmballage = $entityManager->getRepository(Emballage::class)->findOneBy(['user' => $user]);
            //dd($checkEmballage);
            
           if($checkEmballage !== null){
            $checkEmballage->setTitre($request->request->get('emballage'));
            
            $entityManager->flush();
           }else{
            $emballage = new Emballage();
            $emballage->setUser($user);
            if($request->request->get('emballage') === ''){
                $emballage->setTitre(null);
            }else{
                $emballage->setTitre($request->request->get('emballage'));
            }
            
            $entityManager->persist($emballage);
            $entityManager->flush($emballage);
            }
            
            
            $user->setEmail($request->request->get('email'));
            $user->setName($request->request->get('name'));
            $user->setPhone($request->request->get('phone'));
            $user->setAdresse($request->request->get('adresse'));
            $user->setVille($request->request->get('ville'));
            $user->setCodePostal($request->request->get('codeP'));

            if($request->request->get('BanMethode') === ''){
                $user->setBanMethode(null);
            }else{
                $user->setBanMethode($request->request->get('BanMethode'));
            }
            
            $user->setCountry($request->request->get('country'));
            $entityManager->flush();
            return $this->json('parfait');

        } catch (e){
            dd(e);
        }

        dd($user);
    return $this->json('hahaha');
     }


     #[Route('/admin/user/{id}', name: 'app_admin_user')]
     #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
     public function showOneUser(ManagerRegistry $doctrine, UserRepository $userRepo, $id, SerializerInterface $serializer): JsonResponse
     {
        // $entityManager = $doctrine->getManager();
        // $user = $entityManager->getRepository(User::class)->find($id);
        // $test =  $user->getEmballage();
        //dd($userRepo->find($id));
          return $this->json($userRepo->find($id), 200,[],['groups' => 'groupe:get']);
     }



     #[Route('/admin/country')]
     #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
     public function getCountry(ManagerRegistry $doctrine, UserRepository $userRepo, SerializerInterface $serializer): JsonResponse
     {
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->findAll();
        
        $country = [];

        foreach($user as $u){
            if($u->getCountry() !== null){
                if(!in_array($u->getCountry(), $country)){
                    $country[] = $u->getCountry();
            } 
        }
        }
         return $this->json($country);
     }

     #[Route('/admin/ban/country')]
     #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
     public function BanCountry(ManagerRegistry $doctrine, UserRepository $userRepo, SerializerInterface $serializer,  Request $request): JsonResponse
     {


        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a ete envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
            
        
         }else{
            return $this->json('problem mon ami');
        }

        $user = $entityManager->getRepository(User::class)->findBy(['Country' => $request->request->get('country')]);
        //dd($request->request);
        foreach($user as $u){
             $u->setBanMethode($request->request->get('option'));
             
            //dump($u->getName());
        }
        $entityManager->flush();
        
        
        return $this->json('pays bannis');
     }


     #[Route('/admin/countryban')]
     #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
     public function getCountryBan(ManagerRegistry $doctrine, UserRepository $userRepo, SerializerInterface $serializer): JsonResponse
     {
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->findBy(['BanMethode' => 'paypal']);
        $usercb = $entityManager->getRepository(User::class)->findBy(['BanMethode' => 'carte bancaire']);
        $countrycb = [];
        $countryppl = [];
        $all = [];
        foreach($usercb as $cb){
            if($cb->getCountry() !== null){
                if(!in_array($cb->getCountry(), $countrycb)){
                    $countrycb [] = $cb->getCountry();
                }
            }
        }

        foreach($user as $ppl){
            if($cb->getCountry() !== null){
                if(!in_array($ppl->getCountry(), $countryppl)){
                    $countryppl [] =  $ppl->getCountry();
                }
            }
        }

        $all [] = $countrycb;
        $all [] = $countryppl;
        return $this->json($all);
     }


     #[Route('/admin/ban/remove', methods:('POST'))]
     #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants')]
     public function RemoveBan(ManagerRegistry $doctrine, UserRepository $userRepo, SerializerInterface $serializer,  Request $request): JsonResponse
     {
        if ($request->isMethod('POST')) {
            $data = json_decode($request->getContent(), true);

             if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->json('erreur');
            }

            if ($data === null) {
            return $this->json('rien a ete envoyé');
            }   

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
            
        
         }else{
            return $this->json('problem mon ami');
        }

        $country = $request->request->get('country');
        $user = $entityManager->getRepository(User::class)->findBy(['Country' => $country]);
        foreach($user as $u){
            $u->setBanMethode(null);
            $entityManager->flush();
        }

        return $this->json("c'est carré");
     }

}
