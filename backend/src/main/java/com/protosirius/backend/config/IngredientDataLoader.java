package com.protosirius.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.protosirius.backend.entity.Ingredient;
import com.protosirius.backend.repository.IngredientRepository;

@Component
public class IngredientDataLoader implements CommandLineRunner {

    private final IngredientRepository ingredientRepository;



    public IngredientDataLoader(IngredientRepository ingredientRepository) {this.ingredientRepository = ingredientRepository;}

    @Override
    public void run(String... args) {
        if (ingredientRepository.count() > 0) {return;}


        ingredientRepository.saveAll(java.util.List.of(  
            
            
            
            
            new Ingredient("Poitrine de poulet", 31.0, 0.0, 3.6, 165),
                new Ingredient("Blanc d'oeuf", 11.0, 0.7, 0.2, 52),
                 new Ingredient("Thon au naturel", 26.0, 0.0, 1.0, 116),
                new Ingredient("Boeuf maigre", 26.0, 0.0, 15.0, 250),
                new Ingredient("Saumon", 20.0, 0.0, 13.0, 208),
                 new Ingredient("Fromage blanc 0%", 11.0, 4.0, 0.2, 60),
                new Ingredient("Yaourt grec", 10.0, 3.6, 0.4, 59),
                new Ingredient("Tofu", 8.0, 2.0, 4.8, 76),
                
                new Ingredient("Oeuf entier", 13.0, 1.1, 11.0, 155),
                new Ingredient("Lentilles cuites", 9.0, 20.0, 0.4, 116),
                new Ingredient("Dinde", 29.0, 0.0, 2.0, 135),
                new Ingredient("Crevettes", 24.0, 0.2, 0.3, 99),
                new Ingredient("Riz blanc cuit", 2.7, 28.0, 0.3, 130),
                
                new Ingredient("Pates cuites", 5.8, 25.0, 0.9, 131),
                new Ingredient("Avoine (flocons)", 13.0, 67.0, 7.0, 389),
                new Ingredient("Pain complet", 9.0, 41.0, 3.4, 247),
                new Ingredient("Pomme de terre cuite", 2.0, 17.0, 0.1, 77),
                new Ingredient("Patate douce", 1.6, 20.0, 0.1, 86),
                new Ingredient("Banane", 1.1, 23.0, 0.3, 89),
                new Ingredient("Quinoa cuit", 4.4, 21.0, 1.9, 120),
                new Ingredient("Pomme", 0.3, 14.0, 0.2, 52),
                new Ingredient("Miel", 0.3, 82.0, 0.0, 304),
                new Ingredient("Riz complet cuit", 2.6, 23.0, 0.9, 111),
                new Ingredient("Semoule cuite", 3.8, 23.0, 0.2, 112),
                new Ingredient("Huile d'olive", 0.0, 0.0, 100.0, 884),
                 new Ingredient("Amandes", 21.0, 22.0, 50.0, 579),
                new Ingredient("Avocat", 2.0, 9.0, 15.0, 160),
                new Ingredient("Beurre de cacahuete", 25.0, 20.0, 50.0, 588),
                new Ingredient("Noix", 15.0, 14.0, 65.0, 654),
                new Ingredient("Graines de chia", 17.0, 42.0, 31.0, 486),
                new Ingredient("Brocoli", 2.8, 7.0, 0.4, 34),
                new Ingredient("Epinards", 2.9, 3.6, 0.4, 23),
                new Ingredient("Haricots verts", 1.8, 7.0, 0.2, 31) ));
    }
}
