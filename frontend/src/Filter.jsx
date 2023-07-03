import React, { useState } from "react";
import Modal from "react-modal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import "./Filter.css";

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    overflowY:"scroll",
    zIndex: 999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 1400,
    maxHeight: 600,
    
  },
};

function Filter() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="Filter">
      <button onClick={setModalOpen}><FontAwesomeIcon icon={faFilter} /></button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <div>A cookbook or cookery book[1] is a kitchen reference containing recipes.

Cookbooks may be general, or may specialize in a particular cuisine or category of food.

Recipes in cookbooks are organized in various ways: by course (appetizer, first course, main course, dessert), by main ingredient, by cooking technique, alphabetically, by region or country, and so on. They may include illustrations of finished dishes and preparation steps; discussions of cooking techniques, advice on kitchen equipment, ingredients, and substitutions; historical and cultural notes; and so on.

Cookbooks may be written by individual authors, who may be chefs, cooking teachers, or other food writers; they may be written by collectives; or they may be anonymous. They may be addressed to home cooks, to professional restaurant cooks, to institutional cooks, or to more specialized audiences.

Some cookbooks are didactic, with detailed recipes addressed to beginners or people learning to cook particular dishes or cuisines;[2] others are simple aide-memoires, which may document the composition of a dish or even precise measurements, but not detailed techniques.[3]

History
Early works

Apicius, De re coquinaria, an early collection of Roman recipes

18th Century Recipes for Biscuits from a private collection of recipes
See also: Category: Medieval Cookbooks
Not all cultures left written records of their culinary practices, but some examples have survived, notably three Akkadian tablets from Ancient Mesopotamia, dating to about 1700 BC, large fragments from Archestratus, the Latin Apicius and some texts from the Tang dynasty.[4][5][6]

The earliest collection of recipes that has survived in Europe is De re coquinaria, written in Latin. An early version was first compiled sometime in the 1st century and has often been attributed to the Roman gourmet Marcus Gavius Apicius, though this has been cast in doubt by modern research. An Apicius came to designate a book of recipes. The current text appears to have been compiled in the late 4th or early 5th century; the first print edition is from 1483. It records a mix of ancient Greek and Roman cuisine, but with few details on preparation and cooking.[7]

An abbreviated epitome entitled Apici Excerpta a Vinidario, a "pocket Apicius" by Vinidarius, "an illustrious man",[8] was made in the Carolingian era.[9] In spite of its late date it represents the last manifestation of the cuisine of Antiquity.

Medieval
Asian
The earliest cookbooks known in Arabic are those of al-Warraq (an early 10th-century compendium of recipes from the 9th and 10th centuries) and al-Baghdadi (13th century).[citation needed]

Manasollasa from India contains recipes of vegetarian and non-vegetarian cuisines, which preceded the cookbook writing history in Europe by a century.[10] While the text is not the first among Indian books to describe fermented foods, it contains a range of cuisines based on fermentation of cereals and flours.[11][12]

Chinese recipe books are known from the Tang dynasty, but most were lost.[citation needed] One of the earliest surviving Chinese-language cookbooks is Hu Sihui's "Yinshan Zhengyao" (Important Principles of Food and Drink), believed to be from 1330. Hu Sihui, Buyantu Khan's dietitian and therapist, recorded a Chinese-inflected Central Asian cuisine as eaten by the Yuan court; his recipes were adapted from foods eaten all over the Mongol Empire.[13] Eumsik dimibang, written around 1670, is the oldest Korean cookbook and the first cookbook written by a woman in East Asia.

European
After a long interval, the first recipe books to be compiled in Europe since Late Antiquity started to appear in the late thirteenth century. About a hundred are known to have survived, some fragmentary, from the age before printing.[14] The earliest genuinely medieval recipes have been found in a Danish manuscript dating from around 1300, which in turn are copies of older texts that date back to the early 13th century or perhaps earlier.[15]

Low and High German manuscripts are among the most numerous. Among them is Daz buch von guter spise ("The Book of Good Food") written c. 1350 in Würzberg and Kuchenmeysterey ("Kitchen Mastery"), the first printed German cookbook from 1485.[16] Two French collections are probably the most famous: Le Viandier ("The Provisioner") was compiled in the late 14th century by Guillaume Tirel, master chef for two French kings; and Le Menagier de Paris ("The Householder of Paris"), a household book written by an anonymous middle class Parisian in the 1390s.[17] Du fait de cuisine is another Medieval French cookbook, written in 1420.

From Southern Europe there is the 14th century Valencian manuscript Llibre de Sent Soví (1324), the Catalan Llibre de totes maneres de potatges de menjar ("The book of all recipes of dishes") and several Italian collections, notably the Venetian mid-14th century Libro per Cuoco,[18] with its 135 recipes alphabetically arranged. The printed De honesta voluptate et valetudine ("On honourable pleasure"), first published in 1475, is one of the first cookbooks based on Renaissance ideals, and, though it is as much a series of moral essays as a cookbook, has been described as "the anthology that closed the book on medieval Italian cooking".[19]

Medieval English cookbooks include The Forme of Cury and Utilis Coquinario, both written in the fourteenth century. The Forme of Cury is a cookbook authored by the chefs of Richard II. Utilis Coquinario is a similar cookbook though written by an unknown author. Another English manuscript (1390s) includes the earliest recorded recipe for ravioli, even though ravioli did not originate in England.[20]

Modern cookbooks

from Modern Cookery for Private Families by Eliza Acton (London: Longmans, Green, Reader, and Dyer, 1871, p. 48)
With the advent of the printing press in the 16th and 17th centuries, numerous books were written on how to manage households and prepare food. In Holland[21] and England[22] competition grew between the noble families as to who could prepare the most lavish banquet. By the 1660s, cookery had progressed to an art form and good cooks were in demand. Many of them published their own books detailing their recipes in competition with their rivals.[23] Many of these books have now been translated and are available online.[24]

By the 19th century, the Victorian preoccupation for domestic respectability brought about the emergence of cookery writing in its modern form. In 1796, the first known American cookbook titled, American Cookery, written by Amelia Simmons, was published in Hartford, Connecticut. Until then, the cookbooks printed and used in the Thirteen Colonies were British. The first modern cookery writer and compiler of recipes for the home was Eliza Acton. Her pioneering cookbook, Modern Cookery for Private Families (1845), was aimed at the domestic reader rather than the professional cook or chef. This was an immensely influential book, and it established the format for modern writing about cookery.[citation needed] The publication introduced the now-universal practice of listing the ingredients and suggested cooking times with each recipe. It included the first recipe for Brussels sprouts.[25] Contemporary chef Delia Smith is quoted as having called Acton "the best writer of recipes in the English language".[26] Modern Cookery long survived her, remaining in print until 1914 and available more recently in facsimile reprint.

Acton's work was an important influence on Isabella Beeton,[27] who published Mrs Beeton's Book of Household Management in 24 monthly parts between 1857 and 1861. The book was a guide to running a Victorian household, with advice on fashion, child care, animal husbandry, poisons, the management of servants, science, religion, and industrialism.[28][29] Despite its title, most of the text consisted of recipes, such that another popular name for the volume is Mrs Beeton's Cookbook. Most of the recipes were illustrated with coloured engravings, and it was the first book to show recipes in a format that is still used today. Many of the recipes were plagiarised from earlier writers, including Acton.

In 1885 the Virginia Cookery Book was published by Mary Stuart Smith.[30] In 1896 the American cook Fannie Farmer (1857–1915) published The Boston Cooking-School Cook Book which contained some 1,849 recipes.[31]

Types of cookbooks

Betty Crocker's Cook Book for Boys and Girls, 1957
Cookbooks that serve as basic kitchen references (sometimes known as "kitchen bibles") began to appear in the early modern period. They provided not just recipes but overall instruction for both kitchen technique and household management. Such books were written primarily for housewives and occasionally domestic servants as opposed to professional cooks, and at times books such as The Joy of Cooking (USA), La bonne cuisine de Madame E. Saint-Ange (France), The Art of Cookery (UK, USA), Il cucchiaio d'argento (Italy), and A Gift to Young Housewives (Russia) have served as references of record for national cuisines.

Cookbook also tell stories of the writers themselves and reflect upon the era in which they are written. They often reveal notions of social, political, environmental or economic contexts. For example, during the era of industrialization, convenience foods were brought into many households and were integrated and present in cookbooks written in this time.[32] Related to this class are instructional cookbooks, which combine recipes with in-depth, step-by-step recipes to teach beginning cooks basic concepts and techniques. In vernacular literature, people may collect traditional recipes in family cookbooks.

While western cookbooks usually group recipes for main courses by the main ingredient of the dishes, Japanese cookbooks usually group them by cooking techniques (e.g., fried foods, steamed foods, and grilled foods). Both styles of cookbook have additional recipe groupings such as soups or sweets.

International and ethnic

Norwegian immigrant cookbook in Norwegian, published in the United States in 1899.
International and ethnic cookbooks fall into two categories: the kitchen references of other cultures, translated into other languages; and books translating the recipes of another culture into the languages, techniques, and ingredients of a new audience. The latter style often doubles as a sort of culinary travelogue, giving background and context to a recipe that the first type of book would assume its audience is already familiar with. Popular Puerto Rican cookbook, Cocina Criolla, written by Carmen Aboy Valldejuli, includes recipes that are typically of traditional Puerto Rican cuisine such as mofongo and pasteles. Valldejuli's cookbook was not only important to Puerto Ricans, but also very popular in the United States where her original cookbook has since been published in several editions, including English versions. These include The Art of Caribbean Cookery - Doubleday, 1957; Puerto Rican Cookery - Pelican Publishing, 1983; and, Juntos en la Cocina (co-authored with her husband, Luis F. Valldejuli) - Pelican Publishing, 1986.[33]

Professional cookbooks
Professional cookbooks are designed for the use of working chefs and culinary students and sometimes double as textbooks for culinary schools. Such books deal not only in recipes and techniques, but often service and kitchen workflow matters. Many such books deal in substantially larger quantities than home cookbooks, such as making sauces by the liter or preparing dishes for large numbers of people in a catering setting. While the most famous of such books today are books like Le guide culinaire by Escoffier or The Professional Chef by the Culinary Institute of America, such books go at least back to medieval times, represented then by works such as Taillevent's Viandier and Chiquart d'Amiço's Du fait de cuisine.

Single-subject
Single-subject books, usually dealing with a specific ingredient, technique, class of dishes or target group (e.g. for kids), are quite common as well. Jack Monroe for example features low budget recipes. Some imprints such as Chronicle Books have specialized in this sort of book, with books on dishes like curries, pizza, and simplified ethnic food. Popular subjects for narrow-subject books on technique include grilling/barbecue, baking, outdoor cooking, and even recipe cloning (Recipe cloning is copying commercial recipes where the original is a trade secret).[34]

Community
Community cookbooks (also known as compiled, regional, charitable, and fund-raising cookbooks) are a unique genre of culinary literature. Community cookbooks focus on home cooking, often documenting regional, ethnic, family, and societal traditions, as well as local history.[35][36] Sondra Gotlieb, for example, wrote her cookbooks on Canadian food culture by visiting people and homes by region. She gathered recipes, observed the foodways, observed the people and their traditions of each region by being in their own homes. Gotlieb did this so that she could put together a comprehensive cookbook based on the communities and individuals that make up Canada.[37] Gooseberry Patch has been publishing community-style cookbooks since 1992 and built their brand on this community.

Community cookbooks have sometimes been created to offer a counter-narrative of historical events or sustain a community through difficult times. The Historical Cookbook of the American Negro, published in 1958 by the National Council of Negro Women, includes recipes that illuminate histories of Black resistance, including "Nat Turner Crackling Bread."[38] The 1976 People's Philadelphia Cookbook, published by grassroots organization The People's Fund, includes recipes from members of the Black Panther Party, The United Farm Workers, and the Gay Activist Alliance of Philadelphia.[39] For In Memory's Kitchen, written in the 1940s by Jewish women interned at the Theresienstadt concentration camp in Czechoslovakia, women drew on their memories to contribute recipes.[40]

Chefs
Cookbooks can also document the food of a specific chef (particularly in conjunction with a cooking show) or restaurant. Many of these books, particularly those written by or for a well-established cook with a long-running TV show or popular restaurant, become part of extended series of books that can be released over the course of many years. Popular chef-authors throughout history include people such as Delia Smith, Julia Child, James Beard, Nigella Lawson, Edouard de Pomiane, Jeff Smith, Emeril Lagasse, Claudia Roden, Madhur Jaffrey, Katsuyo Kobayashi, and possibly even Apicius, the semi-pseudonymous author of the Roman cookbook De re coquinaria, who shared a name with at least one other famous food figure of the ancient world.</div>

        <button onClick={() => setModalOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default Filter;
