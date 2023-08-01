export function getAssetID(symbol_id: string): string {
  const inputString = symbol_id;
  const parts = inputString.split('_');
  const assetID = parts[2];
  
  return assetID
}

export function getAssetName(symbol_id: string): string {
  const inputString = symbol_id;
  const parts = inputString.split('_');
  const assetName = parts[0];
  
  return assetName
}