interface RegisterDeviceInputDTO {
  fcmToken?: string
}

interface UpdateDeviceInputDTO {
  fcmToken: string
  brand?: string
  manufacturer?: string
  model?: string
  serial?: string
  buildId?: string
  os?: string
  osVersion?: string
  appVersionName?: string
  appVersionCode?: number
}
interface ISMSData {
  smsBody: string
  receivers: string[]
}
interface SendSMSInputDTO extends ISMSData {}
