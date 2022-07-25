<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220719144829 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sub_categorie_categorie DROP FOREIGN KEY FK_B2D18002ABA7A01B');
        $this->addSql('DROP TABLE sub_categorie');
        $this->addSql('DROP TABLE sub_categorie_categorie');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE sub_categorie (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE sub_categorie_categorie (sub_categorie_id INT NOT NULL, categorie_id INT NOT NULL, INDEX IDX_B2D18002ABA7A01B (sub_categorie_id), INDEX IDX_B2D18002BCF5E72D (categorie_id), PRIMARY KEY(sub_categorie_id, categorie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE sub_categorie_categorie ADD CONSTRAINT FK_B2D18002ABA7A01B FOREIGN KEY (sub_categorie_id) REFERENCES sub_categorie (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sub_categorie_categorie ADD CONSTRAINT FK_B2D18002BCF5E72D FOREIGN KEY (categorie_id) REFERENCES categorie (id) ON UPDATE NO ACTION ON DELETE CASCADE');
    }
}
