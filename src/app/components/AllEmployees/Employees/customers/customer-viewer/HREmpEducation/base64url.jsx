export const MultiBase64Converter = async (e) => {
    let offerLetter = [];
    let Documentypefile = [];

    for (let i = 0; i < e.target.files.length; i++) {
        offerLetter.push(e.target.files[i]);
        Documentypefile.push(e.target.name);
    }
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const tobase64Handler = async (files) => {
        const filePathsPromises = [];
        const passingDatafile = [];

        files.forEach((file) => {
            filePathsPromises.push(toBase64(file));
        });
        const filePaths = await Promise.all(filePathsPromises);
        const mappedFiles = filePaths.map((base64File) => ({
            selectedFile: base64File,
        }));

        files.forEach((file, i) => {
            var Dataoffile = `${Documentypefile[i]}-${file.name.split(".")[0]}`;
            passingDatafile.push({
                base64: mappedFiles[i].selectedFile,
                documentType: Documentypefile[i],
                documentExt: file.type.split("/")[1],
                fileName: Dataoffile,
            });
        });

        return passingDatafile;
    };

    const Arraybase64 = await tobase64Handler(offerLetter);

    return Arraybase64;
};
