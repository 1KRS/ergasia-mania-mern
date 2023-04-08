import { greekTerms, englishTerms, swedishTerms } from './translationTerms';

const translateText = (text, language) => {
  const termIndex = greekTerms.findIndex((e) => e === text);
  const termInLanguage =
    language === 'english'
      ? englishTerms[termIndex]
      : language === 'svenska'
      ? swedishTerms[termIndex]
      : text;

  return termInLanguage;
};

export { translateText };
