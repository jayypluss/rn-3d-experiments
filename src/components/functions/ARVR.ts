import {Linking} from 'react-native'

interface SceneViewerOptionalUrlParams {
  fallbackUrl?: string
  mode?: string
  link?: string
  resizable?: boolean
  enableVerticalPlacement?: boolean
  title?: string
  referrer?: string
  sound?: string
  cardContent?: string
  shareText?: string
}

function intentUrl(
  file: string,
  options: SceneViewerOptionalUrlParams,
): string {
  const {
    fallbackUrl,
    mode,
    link,
    resizable,
    enableVerticalPlacement,
    title,
    referrer,
    sound,
    cardContent,
    shareText,
  } = options

  if (!file) throw 'File argument is needed in AR url.'
  let url = `https://arvr.google.com/scene-viewer/1.2?file=${file}`

  if (mode != null) url = `${url}&mode=${mode}`
  if (fallbackUrl != null) url = `${url}&S.browser_fallback_url=${fallbackUrl}`
  if (link != null) url = `${url}&link=${link}`
  if (resizable != null) url = `${url}&resizable=${resizable}`
  if (enableVerticalPlacement != null)
    url = `${url}&enable_vertical_placement=${enableVerticalPlacement}`
  if (title != null) url = `${url}&title=${title}`
  if (referrer != null) url = `${url}&referrer=${referrer}`
  if (sound != null) url = `${url}&sound=${sound}`
  if (cardContent != null) url = `${url}&card_content=${cardContent}`
  if (shareText != null) url = `${url}&share_text=${shareText}`

  return url
}

async function openARVRLink(
  customUrl?: string,
  customOptions?: SceneViewerOptionalUrlParams,
) {
  const url = customUrl
    ? customUrl
    : 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf'
  const options = customOptions
    ? customOptions
    : {mode: 'ar_only', resizable: false}

  await Linking.openURL(intentUrl(url, options))
}

export default openARVRLink
