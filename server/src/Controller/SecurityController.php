<?php


namespace App\Controller;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Repository\UserRepository;

/**
 * @Route("/account", name="api_")
 */
class SecurityController extends AbstractController
{


/**
* @Route("/logout", name="app_logout")
*/
public function logout()
{
throw new \Exception('Will be intercepted before getting here');
}
/**
 * @Route("/register", name="app_register", methods={"POST"})
 */
    public function register(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository)
    {
        // TODO - use Symfony forms & validation
        if ($request->isMethod('POST')) {
                $entityManager = $doctrine->getManager();
                $data = json_decode($request->getContent(), true);
                $request->request->replace($data);
                $emailFromForm = $request->request->get('email');
                $emailFromDataBase = $userRepository->findOneByEmail($emailFromForm);
            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json('erreur sur format JSON');;
            }
            if ($data === null) {
                return true;
            }
            if ($emailFromDataBase){
                return $this->json('utilisateur deja inscrit');
            }

            

            $entityManager = $doctrine->getManager();
            $user = new User();
            $user->setEmail($request->request->get('email'));
            $user->setName($request->request->get('name'));
            $user->setPhone($request->request->get('phone'));
            $user->setAdresse($request->request->get('adresse'));
            $user->setVille($request->request->get('ville'));
            // $user->setCodePostal($request->request->get('codePostal'));

            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $request->request->get('password')
            );
            $user->setPassword($hashedPassword);

            try{
               $entityManager->persist($user);
               $entityManager->flush($user);
               return $this->json('inscription effectué avec succées ');
            }
            catch(\Exception $e){
                return $this->json('impossible d\'inscrire');
            }
            
            
        }else{
            return $this->json('utilise une requette post');
        }

    }

}