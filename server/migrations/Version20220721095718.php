<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220721095718 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE visited_article DROP FOREIGN KEY FK_8D1359C38C9FE8F');
        $this->addSql('DROP TABLE visited');
        $this->addSql('DROP TABLE visited_article');
        $this->addSql('ALTER TABLE article CHANGE stock visit INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE visited (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, stats INT DEFAULT NULL, INDEX IDX_C4DEBC44A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE visited_article (visited_id INT NOT NULL, article_id INT NOT NULL, INDEX IDX_8D1359C38C9FE8F (visited_id), INDEX IDX_8D1359C7294869C (article_id), PRIMARY KEY(visited_id, article_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE visited ADD CONSTRAINT FK_C4DEBC44A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE visited_article ADD CONSTRAINT FK_8D1359C38C9FE8F FOREIGN KEY (visited_id) REFERENCES visited (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE visited_article ADD CONSTRAINT FK_8D1359C7294869C FOREIGN KEY (article_id) REFERENCES article (id) ON UPDATE NO ACTION ON DELETE CASCADE');
        $this->addSql('ALTER TABLE article CHANGE visit stock INT DEFAULT NULL');
    }
}
