interface RegisterDeviceInputDTO {
  fcmToken?: string
}

interface UpdateFCMTokenInputDTO {
  fcmToken: string
}
interface ISMSData {
  message: string
  receivers: string[]
}
interface SendSMSInputDTO {
  smsData: ISMSData
}
