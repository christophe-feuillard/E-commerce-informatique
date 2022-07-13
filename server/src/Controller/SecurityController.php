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
* @Route("/login", name="app_login")
*/
public function login(AuthenticationUtils $authenticationUtils)
{
// get the login error if there is one
$error = $authenticationUtils->getLastAuthenticationError();
// last username entered by the user
$lastUsername = $authenticationUtils->getLastUsername();
return $this->render('security/login.html.twig', [
'last_username' => $lastUsername,
'error'         => $error,
]);
}
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
            $entityManager = $doctrine->getManager();
            $user = new User();
            $user->setEmail($request->request->get('email'));
            $user->setName($request->request->get('name'));
            $user->setPhone($request->request->get('phone'));
            $user->setAdresse($request->request->get('adress'));
            $user->setVille($request->request->get('ville'));

            $hashedPassword = $passwordHasher->hashPassword(
                $user,
                $request->request->get('password')
            );

            $user->setPassword($hashedPassword);
            $entityManager->persist($user);
            $entityManager->flush($user);
            return $this->json('parfait');
        }else{
            return $this->json('problem mon ami');
        }

    }

}