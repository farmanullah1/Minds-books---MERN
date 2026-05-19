// Photo filter presets for Instagram-style post creation
export const filters: Record<string, string> = {
  Original: '',
  Warm:     'brightness(1.05) saturate(1.3) sepia(0.15)',
  Cool:     'brightness(1.02) saturate(0.9) hue-rotate(15deg)',
  Vintage:  'contrast(0.85) brightness(0.9) sepia(0.35) saturate(1.2)',
  Fade:     'brightness(1.1) contrast(0.85) saturate(0.8)',
  Chrome:   'contrast(1.15) brightness(1.05) saturate(1.4)',
  Noir:     'grayscale(1) contrast(1.2) brightness(0.9)',
  Vivid:    'contrast(1.1) brightness(1.05) saturate(1.6)',
  Golden:   'brightness(1.05) saturate(1.2) sepia(0.25) hue-rotate(-10deg)'
};

export const getFilterStyle = (filterName: string): React.CSSProperties => ({
  filter: filters[filterName] || ''
});

export default filters;
