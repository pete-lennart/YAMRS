package helper

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
)

func LoadConfigIntoStruct(path string, container interface{}) (error) {
	absPath, _ := filepath.Abs(path)
	jsonFile, err := os.Open(absPath)
	if err != nil {
		return err
	}
	defer jsonFile.Close()
	byteValue, err := ioutil.ReadAll(jsonFile)
	if err != nil {
		return err
	}
	err = json.Unmarshal(byteValue, container)
	if err != nil {
		return err
	}
	return nil
}
