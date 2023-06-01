import {useState} from "react";
import fetchApi from "../lib/FetchApi";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function AddCourseForm() {
  const [data, setData] = useState({
    title: '',
    pictUrl: '',
    description: '',
    file: '',
    isActive: '',
  });
  const [selectedRadioOption, setSelectedRadioOption] = useState('1');
  const [selectedOption, setSelectedOption] = useState('Default')
  const [file, setFile] = useState(new FormData())
  const [fileName, setFilename] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleRadioValueChange = (e) => {
    const radioValue = e.target.value;
    setSelectedRadioOption(radioValue);
  };

  const handleOptionValueChange = (e) => {
    const optionValue = e.target.value;
    setSelectedOption(optionValue);
  }

  const handleFileChange = (e) => {
    const maxSize = 5 * 1024 * 1024;
    const file = e.target.files[0];
    if (file.size > maxSize) {
      MySwal.fire({
        title: 'Image Upload Error',
        text: 'The file you are trying to upload exceeds the maximum allowed file size',
        icon: 'error'
      })
      setFilename('');
      return;
    }
    const formData = new FormData();
    formData.append(e.target.name, e.target.files[0])
    setFilename(formData.get(e.target.name).name);
    setFile(formData)

  }

  const handleUpload = (e) => {
    e.preventDefault();
    const request = {
      file,
    };
    console.log(file.get('file-upload'))
    fetchApi.uploadImage(request)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      body: {
        title: data.title,
        sign_pict_link: data.pictUrl,
        description: data.description,
        type: selectedOption,
        is_deleted: !(!!Number(selectedRadioOption)),
      }
    };
    await fetchApi.postCourse(request)
        .then(({course_id}) => {
          return MySwal.fire({
            title: 'Success',
            text: `Berhasil menambahkan course. course id: ${course_id}`,
            icon: "success"
          }).then(() => {
            window.location.href = '/courses'
          })
        })
        .catch((e) => {
          return MySwal.fire({
            title: 'Error',
            text: `Gagal menambahkan Course: ${e}`,
            icon: "error"
          })
        });
  }
  return (
      <form onSubmit={handleUpload} className='p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8'>
        <div className="space-y-12 space-x-5">
          <div className="border-b border-white-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">Add new course</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                  Title
                </label>
                <div className="mt-2">
                  <input
                      type="text"
                      name="title"
                      id="title"
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={data.title}
                      onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                  Course Image
                </label>
                <div
                    className="mt-2 flex justify-center rounded-lg border border-dashed border-white px-6 py-10"
                    id="upload-container"
                >
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-white" viewBox="0 0 24 24"
                         fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"/>
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-white">
                      <label htmlFor="file-upload"
                             className="relative cursor-pointer rounded-md font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-white">PNG, JPG up to 5MB</p>
                    <p className="text-xs leading-5 text-white">{fileName}</p>
                  </div>
                </div>
              </div>
              {/*<div className="sm:col-span-4">*/}
              {/*  <label htmlFor="pictUrl" className="block text-sm font-medium leading-6 text-white">*/}
              {/*    Sign Picture*/}
              {/*  </label>*/}
              {/*  <div className="mt-2">*/}
              {/*    <input*/}
              {/*        type="text"*/}
              {/*        name="pictUrl"*/}
              {/*        id="pictUrl"*/}
              {/*        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
              {/*        value={data.pictUrl}*/}
              {/*        onChange={handleChange}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
                  Description
                </label>
                <div className="mt-2">
                                <textarea
                                    name="description"
                                    id="description"
                                    className="block w-96 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={data.description}
                                    onChange={handleChange}
                                />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label htmlFor="type"
                       className="block text-sm font-medium leading-6 text-white">Course Type</label>
                <div className="mt-2">
                  <select id="type"
                          name="type"
                          autoComplete="course-type"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          onChange={handleOptionValueChange}
                          value={selectedOption}
                  >
                    <option value='Default' disabled>Choose Course Type</option>
                    <option value='SIBI'>SIBI</option>
                    <option value='BISINDO'>BISINDO</option>
                    <option value='ASL'>ASL</option>
                  </select>
                </div>
              </div>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-white">Is this course active?
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                        id="active"
                        name="isActive"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value='1'
                        checked={selectedRadioOption === '1'}
                        onChange={handleRadioValueChange}
                    />
                    <label htmlFor="active"
                           className="block text-sm font-medium leading-6 text-white">Yes</label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                        id="notActive"
                        name="isActive"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value='0'
                        checked={selectedRadioOption === '0'}
                        onChange={handleRadioValueChange}
                    />
                    <label htmlFor="notActive"
                           className="block text-sm font-medium leading-6 text-white">No</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button type="button" className="text-sm rounded-md py-2 px-3 bg-red-600 font-semibold leading-6 text-white">
            Cancel
          </button>
          <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
  );
}
