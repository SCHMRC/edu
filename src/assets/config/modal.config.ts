import { Teacher } from "src/app/model"
import { Matter } from "src/app/model/matter"

export interface ModalConfig{
  source: string
  matter?: Matter[]
  teacher?: Teacher[]
}

export const MODALSOURCE = {
  ADDMATTER: 'add_matter'
}
