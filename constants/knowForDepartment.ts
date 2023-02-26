import { KnownForDepartment } from "../typing";
interface Props {
  [key: string]: string;
}
const knownForDepartmentTranslations: Props = {
  Acting: "Ator/Atriz",
  Directing: "Diretor/Diretora",
  Writing: "Roteirista",
  Producing: "Produtor/Produtora",
  Cinematography: "Diretor de Fotografia",
  Editing: "Editor/Editora",
  Sound: "Engenheiro de Som",
  ArtDirection: "Diretor de Arte",
  CostumeDesign: "Figurinista",
  Makeup: "Maquiador/Maquiadora",
  SpecialEffects: "Especialista em Efeitos Especiais",
  VisualEffects: "Especialista em Efeitos Visuais",
  Stunts: "Dublê",
  SecondUnitDirecting: "Diretor de Segunda Unidade",
  CameraAndElectricalDepartment: "Cinematografia",
  MusicDepartment: "Compositor/Compositora",
  Animation: "Animador/Animadora",
  Casting: "Diretor de Elenco",
  ProductionManagement: "Gerente de Produção",
  ArtDepartment: "Departamento de Arte",
};
export default knownForDepartmentTranslations;
