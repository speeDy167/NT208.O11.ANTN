export function removeAccents(name: string): string {
   const from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵ";
   const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";

   for (let i = 0; i < from.length; i++) {
      const regex = new RegExp(from[i], "gi");
      name = name.replace(regex, to[i]);
   }

   name = name.toUpperCase()
       .trim()
       .replace(/[^A-Z0-9\-]/g, ' ');

   return name;
}
