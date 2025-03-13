export const cn = (...inputs: Array<ClassValue | ClassArray>): string => {
    let result: string[] = [];
  
    for (const input of inputs) {
      if (!input) continue;
  
      if (typeof input === "string") {
        result.push(input);
      } else if (Array.isArray(input)) {
        result.push(cn(...input));
      } else if (typeof input === "object") {
        for (const [key, value] of Object.entries(input)) {
          if (value) result.push(key);
        }
      }
    }
  
    return result.join(" ");
  }