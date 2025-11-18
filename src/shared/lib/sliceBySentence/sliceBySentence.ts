export const sliceBySentence = (
   description: string,
   limit: number = 200,
   symbol: string = '.',
   dots: boolean = true,
): string => {
   if (description.length <= limit) return description;

   const sliced = description.slice(0, limit);
   const lastDotIndex = sliced.lastIndexOf(symbol);

   if (lastDotIndex !== -1) {
      return sliced.slice(0, lastDotIndex + 1) + (dots ? '...' : '');
   }

   return sliced + (dots ? '...' : '');
};
