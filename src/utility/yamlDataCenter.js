import yaml from 'js-yaml';

const allSectionYamlData = {};

export const getYamlData = (path)=>{

    if (!(path in allSectionYamlData))
    {
        allSectionYamlData[path] = yaml.load(path);
    }

    return allSectionYamlData[path];
}
