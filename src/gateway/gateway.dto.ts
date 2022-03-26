interface RegisterDeviceInputDTO {
  fcmToken?: string
}

interface UpdateFCMTokenInputDTO {
  fcmToken: string
}
interface ISMSData {
  smsBody: string
  receivers: string[]
}
interface SendSMSInputDTO {
  smsData: ISMSData
}
