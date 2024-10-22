// Function to check if all images are loaded
const checkImagesLoaded = async () => {
  const images = document.querySelectorAll("img");
  let loadedCount = 0;
  const totalImages = images.length;

  if (totalImages === 0) return; // If no images, exit early

  await new Promise((resolve) => {
    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === totalImages) {
          resolve(); // All images are loaded
        }
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            resolve(); // All images are loaded
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            resolve(); // Handle image loading error
          }
        };
      }
    });
  });
};

// Function to check if fonts are fully loaded
const checkFontsLoaded = async () => {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready; // Wait for all fonts to be ready
  } else {
    // If document.fonts.ready is not supported, use fallback
    console.warn("document.fonts.ready not supported, falling back.");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Fallback with 1 second timeout
  }
};

// Function to preload all resources (fonts, images, assets)
export const preloadAssets = async () => {
  try {
    // Preload lazy-loaded routes
    await import("../../routes/AccountRoutes");
    await import("../../routes/GuestRoutes");
    await import("../../views/landing-page");

    // Wait for fonts to load
    await checkFontsLoaded();
    await checkImagesLoaded();

    // Wait for other assets like stylesheets and scripts
    await new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.onload = resolve; // Wait for window load event
      }
    });
  } catch (error) {
    console.error("Error loading resources:", error);
  }
};
