<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups("groupe:get")]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups("groupe:get")]
    private $email;

    #[ORM\Column(type: 'json')]
    #[Groups("groupe:get")]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("groupe:get")]
    private $name;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("groupe:get")]
    private $phone;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("groupe:get")]
    private $adresse;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups("groupe:get")]
    private $ville;

    #[ORM\Column(type: 'string', length: 500, nullable: true)]
    private $apiToken;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private $CodePostal;


    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?Emballage $emballage = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private $Country = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups("groupe:get")]
    private ?string $BanMethode = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'], fetch: 'EAGER')]
    #[Groups("groupe:get")]
    private ?Card $card = null;

    #[ORM\Column(length: 255)]
    #[Groups("groupe:get")]
    private ?string $Firstname = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups("groupe:get")]
    private ?\DateTimeInterface $birthdate = null;




    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): self
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): self
    {
        $this->ville = $ville;

        return $this;
    }

    public function getApiToken(): ?string
    {
        return $this->apiToken;
    }

    public function setApiToken(?string $apiToken): self
    {
        $this->apiToken = $apiToken;

        return $this;
    }

    /**
     * @return Collection<int, Article>
     */
    public function getFavoris(): Collection
    {
        return $this->favoris;
    }

    public function addFavori(Article $favori): self
    {
        if (!$this->favoris->contains($favori)) {
            $this->favoris[] = $favori;
        }

        return $this;
    }

    public function removeFavori(Article $favori): self
    {
        $this->favoris->removeElement($favori);

        return $this;
    }

    public function getCodePostal(): ?string
    {
        return $this->CodePostal;
    }

    public function setCodePostal(string $CodePostal): self
    {
        $this->CodePostal = $CodePostal;

        return $this;
    }

    public function setEmballage(?Emballage $emballage): self
    {
        // unset the owning side of the relation if necessary
        if ($emballage === null && $this->emballage !== null) {
            $this->emballage->setUser(null);
        }

        // set the owning side of the relation if necessary
        if ($emballage !== null && $emballage->getUser() !== $this) {
            $emballage->setUser($this);
        }

        $this->emballage = $emballage;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->Country;
    }

    public function setCountry(string $Country): self
    {
        $this->Country = $Country;

        return $this;
    }

 

    public function getBanMethode(): ?string
    {
        return $this->BanMethode;
    }

    public function setBanMethode(?string $BanMethode): self
    {
        $this->BanMethode = $BanMethode;

        return $this;
    }

    public function getCard(): ?Card
    {
        return $this->card;
    }

    public function setCard(?Card $card): self
    {
        // unset the owning side of the relation if necessary
        if ($card === null && $this->card !== null) {
            $this->card->setUser(null);
        }

        // set the owning side of the relation if necessary
        if ($card !== null && $card->getUser() !== $this) {
            $card->setUser($this);
        }

        $this->card = $card;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->Firstname;
    }

    public function setFirstname(string $Firstname): self
    {
        $this->Firstname = $Firstname;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(?\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }



}
