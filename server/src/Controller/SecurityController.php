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
    public function register(Request $request, ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher)
    {
        // TODO - use Symfony forms & validation
        if ($request->isMethod('POST')) {
                $data = json_decode($request->getContent(), true);
                $emailFromDataBase = $entityManager->getRepository(User::class)->findOneByEmail($request->request->get('email'));
                $emailFromForm = $request->request->get('email');
            if (json_last_error() !== JSON_ERROR_NONE) {
                return $this->json('erreur sur format JSON');;
            }
            if ($data === null) {
                return true;
            }
            if ($emailFromDataBase === $check){
                return $this->json('utilisateur deja inscrit');
            }

            $request->request->replace($data);
            $entityManager = $doctrine->getManager();
            

            $entityManager = $doctrine->getManager();
            $user = new User();
            $user->setEmail($request->request->get('email'));
            $user->setName($request->request->get('name'));
            $user->setPhone($request->request->get('phone'));
            $user->setAdresse($request->request->get('adresse'));
            $user->setVille($request->request->get('ville'));

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